"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useUser } from "@/components/UserProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getUserInitials } from "@/lib/utils";
import { MessageSquare, Send, Loader2, MoreVertical, Edit2, Trash2, X, Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Comment {
    id: string;
    course_id: string;
    user_id: string;
    content: string;
    created_at: string;
    profiles: {
        full_name: string;
        avatar_url?: string;
    };
}

interface CourseCommentsProps {
    courseId: string;
}

export function CourseComments({ courseId }: CourseCommentsProps) {
    const { user } = useUser();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Editing state
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState("");
    const [updating, setUpdating] = useState(false);

    const fetchComments = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("course_comments")
                .select(`
          *,
          profiles:user_id (
            full_name
          )
        `)
                .eq("course_id", courseId)
                .order("created_at", { ascending: false });

            if (error) {
                if (error.code === 'PGRST116' || error.message.includes('relation "course_comments" does not exist')) {
                    setError("Comments table not found. Please ensure the database is set up.");
                } else {
                    console.error("Error fetching comments:", error);
                    setError("Failed to load comments.");
                }
            } else {
                setComments(data || []);
                setError(null);
            }
        } catch (err) {
            console.error("Unexpected error fetching comments:", err);
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [courseId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !newComment.trim() || submitting) return;

        try {
            setSubmitting(true);
            const { error } = await supabase
                .from("course_comments")
                .insert({
                    course_id: courseId,
                    user_id: user.id,
                    content: newComment.trim(),
                });

            if (error) throw error;

            setNewComment("");
            fetchComments();
        } catch (err: any) {
            console.error("Error posting comment:", err);
            alert(err.message || "Failed to post comment.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this comment?")) return;

        try {
            const { error } = await supabase
                .from("course_comments")
                .delete()
                .eq("id", id);

            if (error) throw error;
            setComments(comments.filter(c => c.id !== id));
        } catch (err: any) {
            console.error("Error deleting comment:", err);
            alert(err.message || "Failed to delete comment.");
        }
    };

    const handleUpdate = async (id: string) => {
        if (!editContent.trim() || updating) return;

        try {
            setUpdating(true);
            const { error } = await supabase
                .from("course_comments")
                .update({ content: editContent.trim() })
                .eq("id", id);

            if (error) throw error;

            await fetchComments();
            setEditingCommentId(null);
            setEditContent("");
        } catch (err: any) {
            console.error("Error updating comment:", err);
            alert(err.message || "Failed to update comment.");
        } finally {
            setUpdating(false);
        }
    };

    const startEditing = (comment: Comment) => {
        setEditingCommentId(comment.id);
        setEditContent(comment.content);
    };

    const cancelEditing = () => {
        setEditingCommentId(null);
        setEditContent("");
    };

    if (loading && comments.length === 0) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-semibold text-gray-800 tracking-tight">Discussion</h3>
                <span className="text-sm text-muted-foreground">({comments.length})</span>
            </div>

            {user ? (
                <form onSubmit={handleSubmit} className="space-y-4 bg-orange-50/30 p-4 rounded-xl border border-orange-100/50">
                    <div className="flex gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                            <AvatarImage src={user.user_metadata?.avatar_url} />
                            <AvatarFallback className="bg-orange-100 text-orange-700 font-medium">
                                {getUserInitials(user.email || "User")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                            <Textarea
                                placeholder="Share your thoughts or ask a question..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="min-h-[100px] bg-white resize-none border-orange-100 focus:border-orange-500 focus:ring-orange-500/20 transition-all rounded-xl"
                            />
                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    disabled={!newComment.trim() || submitting}
                                    className="bg-orange-500 hover:bg-orange-600 text-white gap-2 px-6 rounded-lg font-medium shadow-lg shadow-orange-500/20"
                                >
                                    {submitting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Send className="h-4 w-4" />
                                    )}
                                    Post Comment
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="p-6 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-muted-foreground mb-4">Please log in to join the discussion.</p>
                    <Button variant="outline" onClick={() => window.location.href = '/auth/login'} className="rounded-lg">
                        Login to Comment
                    </Button>
                </div>
            )}

            {error ? (
                <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                    {error}
                </div>
            ) : comments.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground bg-gray-50/50 rounded-xl border border-dashed">
                    <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-20" />
                    <p>No comments yet. Be the first to start the conversation!</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="group flex gap-4 p-4 rounded-2xl hover:bg-gray-50/80 transition-all border border-transparent hover:border-gray-100 relative">
                            <Avatar className="h-10 w-10 shrink-0 border-2 border-white shadow-sm">
                                <AvatarImage src={comment.profiles?.avatar_url} />
                                <AvatarFallback className="bg-gray-100 text-gray-600 font-medium">
                                    {getUserInitials(comment.profiles?.full_name || "User")}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-gray-900 truncate">
                                            {comment.profiles?.full_name || "Community Member"}
                                        </span>
                                        <span className="text-[11px] text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                                            {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                                        </span>
                                    </div>

                                    {user && user.id === comment.user_id && editingCommentId !== comment.id && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => startEditing(comment)} className="gap-2">
                                                    <Edit2 className="h-3.5 w-3.5" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(comment.id)} className="gap-2 text-red-600 focus:text-red-600">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </div>

                                {editingCommentId === comment.id ? (
                                    <div className="space-y-3 mt-2">
                                        <Textarea
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            className="min-h-[80px] bg-white resize-none border-orange-100 focus:border-orange-500 focus:ring-orange-500/20 transition-all rounded-xl text-sm"
                                        />
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={cancelEditing}
                                                className="h-8 rounded-lg text-xs"
                                            >
                                                <X className="h-3.5 w-3.5 mr-1" />
                                                Cancel
                                            </Button>
                                            <Button
                                                size="sm"
                                                disabled={!editContent.trim() || updating}
                                                onClick={() => handleUpdate(comment.id)}
                                                className="h-8 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs shadow-lg shadow-orange-500/10"
                                            >
                                                {updating ? (
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                ) : (
                                                    <Check className="h-3.5 w-3.5 mr-1" />
                                                )}
                                                Save Changes
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-gray-700 leading-relaxed bg-white/50 p-3 rounded-xl rounded-tl-none border border-gray-100/50 shadow-sm whitespace-pre-wrap text-sm">
                                        {comment.content}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
