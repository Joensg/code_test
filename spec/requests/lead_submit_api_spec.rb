require 'rails_helper'

describe 'Lead Submit API', type: :request do
  describe 'get /' do
    subject(:get_root_path) { get root_path }

    it 'returns with http status success' do
      get_root_path

      expect(response).to have_http_status(:success)
    end
  end

  describe 'post /post_lead' do
    let(:post_params) do
      {
        name: 'test name',
        business_name: 'test business name',
        email: 'test@example.com',
        telephone_number: '01234567891'
      }
    end

    subject(:post_to_post_lead_path) { post post_lead_path post_params }

    it 'delegates to MicLeadEnqueue.post_lead' do
      expect(MicLeadEnqueue).to receive(:post_lead).with(post_params).and_return({})

      post_to_post_lead_path
    end
  end
end
