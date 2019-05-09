class LeadSubmitController < ApplicationController

  def index
  end

  def post_lead
    request_params = {
      name: params["name"],
      business_name: params["business_name"],
      email: params["email"],
      telephone_number: params["telephone_number"]
    }

    mic_lead_response = MicLeadEnqueue.post_lead(request_params)

    render json: mic_lead_response || {}
  end
end
