import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { submitCommentAction } from '../store/action';

interface ReviewFormProps {
  offerId: string;
}

function ReviewForm({ offerId }: ReviewFormProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFormValid = rating > 0 && comment.length >= 50 && comment.length <= 300;

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!isFormValid) {
      return;
    }
    setIsSubmitting(true);
    try {
      await dispatch(submitCommentAction(offerId, comment, rating));
      setRating(0);
      setComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(e) => { void handleSubmit(e); }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((star) => (
          <>
            <input
              key={`input-${star}`}
              className="form__rating-input visually-hidden"
              name="rating"
              value={`${star}`}
              id={`${star}-star${star > 1 ? 's' : ''}`}
              type="radio"
              checked={rating === star}
              onChange={(evt: ChangeEvent<HTMLInputElement>) => setRating(Number(evt.target.value))}
              disabled={isSubmitting}
            />
            <label
              key={`label-${star}`}
              htmlFor={`${star}-star${star > 1 ? 's' : ''}`}
              className="reviews__rating-label form__rating-label"
              title={['terribly', 'badly', 'not bad', 'good', 'perfect'][star - 1]}
            >
              <svg className="form__star-image" width="37" height="33">
                <use href="#icon-star"></use>
              </svg>
            </label>
          </>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={comment}
        onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => setComment(evt.target.value)}
        disabled={isSubmitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
