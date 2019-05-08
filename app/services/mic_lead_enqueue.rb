class MicLeadEnqueue
  attr_reader :base_uri

  def initialize base_uri=default_base_uri
    @base_uri = base_uri
  end

  private

  def default_base_uri
    Rails.configuration.lead_api_base_uri
  end
end
