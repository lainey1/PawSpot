import { useMemo } from "react"; // only recalculates the result when one of its dependencies changes, avoiding unnecessary recalculations on every render.

export function useReviewPermissions(reviews, currentUser, spot) {
  return useMemo(() => {
    const isCurrentUserOwner = currentUser?.id === spot?.Owner?.id;
    const hasCurrentUserReviewed = reviews?.some(
      (review) => review.User?.id === currentUser?.id
    );

    return {
      isCurrentUserOwner,
      hasCurrentUserReviewed,
      canPostReview:
        currentUser && !isCurrentUserOwner && !hasCurrentUserReviewed,
    };
  }, [reviews, currentUser, spot]);
}
