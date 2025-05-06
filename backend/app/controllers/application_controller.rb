class ApplicationController < ActionController::API
  respond_to :json
  before_action :authenticate_user!

  rescue_from Exception, with: :handle_exception
  rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found_exception
  rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_exception

  private

  def handle_exception(exception)
    log_error(exception)

    render json: { message: "Internal server exception" }, status: :internal_server_error
  end

  def handle_not_found_exception(exception)
    log_error(exception)

    render json: { message: "Resource not found" }, status: :not_found
  end

  def handle_validation_exception(exception)
    log_error(exception)

    render json: { message: "Validation failed" }, status: :unprocessable_entity
  end

  def log_error(exception)
    Rails.logger.error "#{exception.class}: #{exception.message}"
    Rails.logger.error exception.backtrace.join("\n") if exception.backtrace
  end
end