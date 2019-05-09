class MicLeadEnqueue
  include HTTParty
  base_uri Rails.configuration.lead_api_base_uri

  def self.post_lead lead_details
    options = { query: lead_details.merge(self.additional_params) }
    post('/api/v1/create', options)
  end

  private

  def self.additional_params
    {
      access_token: Rails.configuration.lead_api_access_token,
      pGUID: Rails.configuration.lead_api_pguid,
      pAccName: Rails.configuration.lead_api_paccname,
      pPartner: Rails.configuration.lead_api_ppartner,
    }
  end
end
