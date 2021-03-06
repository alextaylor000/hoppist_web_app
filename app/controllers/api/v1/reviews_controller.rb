class Api::V1::ReviewsController < Api::BaseController
  before_action :authenticate_request, only: [:create]

  def create
    review       = Review.new(review_params)
    review.user  = @current_user
    beer         = review.beer

    if review.save
      # TODO: will this redirect actually return the json response? hopefully..
      redirect_to api_v1_beer_path(beer)
      #render json: review
    else
      # TODO: This doesn't follow JSON API 1.0 spec. Wouldn't it be nice ;)
      render json: review.errors, status: :bad_request
    end
  end

  private
  def review_params
    params.require(:review).permit([:beer_id,
                                    :body,
                                    :star_rating,
                                    :colour_rating,
                                    :flavour_rating
                                    ])
  end
end
