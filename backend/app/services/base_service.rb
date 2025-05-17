class BaseService
  def self.call(**args, &block)
    new(**args, &block).call
  end

  def call
    raise NotImplementedError, "You must implement #call in #{self.class}"
  end
end