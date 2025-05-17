class CustomException < StandardError
  attr_reader :status, :reason

  def initialize(reason, message = nil, status = :internal_server_error)
    super(message)
    @reason = reason
    @status = status
  end
end