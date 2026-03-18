"use client";

import { useState } from "react";
import { TopBar } from "@/components/dashboard";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Spinner,
  Pagination,
  EmptyState,
} from "@/components/ui";
import { useFeedback } from "@/hooks/use-feedback";
import { formatDate } from "@/lib/utils";
import { Star, Clock, User as UserIcon, MessageSquare } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            rating >= star
              ? "fill-[#FF6B00] text-[#FF6B00]"
              : rating >= star - 0.5
                ? "fill-[#FF6B00]/50 text-[#FF6B00]"
                : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-[#3D3D3D]">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function ReviewsPage() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: feedbackData,
    isLoading,
    error,
  } = useFeedback({ page, size: pageSize });

  // Manually compute stats from content so we don't depend on backend pagination metadata
  const reviews = feedbackData?.content ?? [];
  const totalReviews = feedbackData?.totalElements || reviews.length;
  const totalPages = feedbackData?.totalPages || (reviews.length > 0 ? 1 : 0);
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, f) => sum + f.rating, 0) / reviews.length
      : 0;

  return (
    <>
      <TopBar
        title="Reviews & Feedback"
        description="User ratings and feedback from the mobile app"
      />
      <div className="p-6">
        {/* Stats row */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#666666]">
                    Total Reviews
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[#3D3D3D]">
                    {isLoading ? "..." : totalReviews}
                  </p>
                </div>
                <div className="rounded-lg bg-[#99E7F1]/30 p-3">
                  <MessageSquare className="h-6 w-6 text-[#0054C5]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#666666]">
                    Average Rating
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="text-2xl font-bold text-[#3D3D3D]">
                      {averageRating > 0 ? averageRating.toFixed(1) : "—"}
                    </p>
                    {averageRating > 0 && <StarRating rating={averageRating} />}
                  </div>
                </div>
                <div className="rounded-lg bg-[#FF6B00]/10 p-3">
                  <Star className="h-6 w-6 fill-[#FF6B00] text-[#FF6B00]" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#666666]">
                    This Page
                  </p>
                  <p className="mt-1 text-2xl font-bold text-[#3D3D3D]">
                    {reviews.length}
                  </p>
                  <p className="mt-1 text-xs text-[#666666]">
                    of {totalReviews} reviews
                  </p>
                </div>
                <div className="rounded-lg bg-[#52C41A]/10 p-3">
                  <UserIcon className="h-6 w-6 text-[#52C41A]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              User Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Spinner size="lg" />
              </div>
            ) : error ? (
              <div className="py-8 text-center text-sm text-red-500">
                Failed to load reviews
              </div>
            ) : !feedbackData?.content?.length ? (
              <EmptyState
                icon={<Star className="h-12 w-12" />}
                title="No reviews yet"
                description="No feedback has been submitted by users yet."
              />
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Comment</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {feedbackData.content.map((review) => (
                        <TableRow key={review.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#99E7F1] text-sm font-medium text-[#0054C5]">
                                {review.fullName?.charAt(0) ||
                                  review.username?.charAt(0) ||
                                  "?"}
                              </div>
                              <div>
                                <p className="font-medium text-[#3D3D3D]">
                                  {review.fullName || review.username}
                                </p>
                                <p className="text-xs text-[#666666]">
                                  @{review.username}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <StarRating rating={review.rating} />
                          </TableCell>
                          <TableCell>
                            <p className="max-w-md truncate text-[#3D3D3D]">
                              {review.comment}
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-[#666666]">
                              <Clock className="h-4 w-4" />
                              {formatDate(review.createdAt)}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-[#666666]">
                    Showing {reviews.length} of {totalReviews} reviews
                  </p>
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    totalElements={totalReviews}
                    pageSize={pageSize}
                    onPageChange={setPage}
                    onPageSizeChange={(size) => {
                      setPageSize(size);
                      setPage(0);
                    }}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
