require 'rails_helper'

describe MicLeadEnqueue, type: :service do

  describe '#post_lead' do
    let(:post_params) do
      {
        name: "lead test",
        business_name: "lead business test",
        email: "leadtest@example.com",
        telephone_number: "01234567891"
      }
    end

    subject(:mic_lead_enqueue_post) { described_class.post_lead(post_params) }

    context 'when success' do
      it 'returns with http status created' do
        VCR.use_cassette("post_success") do
          response = mic_lead_enqueue_post

          expect(response.code).to eq(201)
        end
      end

      it 'returns with success message' do
        expected_response = {
          "errors" => [],
          "message" => "Enqueue success"
        }

        VCR.use_cassette("post_success") do
          response = mic_lead_enqueue_post

          expect(response.parsed_response).to eq(expected_response)
        end
      end
    end

    context 'when fail' do
      context 'validation error' do
        before do
          post_params['telephone_number'] = "12345678910"
        end

        it 'returns with http status bad request' do
          VCR.use_cassette("post_validation_fail") do
            response = mic_lead_enqueue_post

            expect(response.code).to eq(400)
          end
        end

        it 'error message contains details about validation failure' do
          expected_response = {
            "errors" => ["Field 'telephone_number' wrong format" +
              " (must contain have valid phone number with 11 numbers." +
              " string max 13 chars)"],
            "message" => "Format errors on validation"
          }

          VCR.use_cassette("post_validation_fail") do
            response = mic_lead_enqueue_post

            expect(response.parsed_response).to eq(expected_response)
          end
        end
      end

      context 'unauthorized error' do
        before do
          Rails.configuration.lead_api_access_token = 'test_invalid_token'
        end

        it 'returns with http status unauthorised' do
          VCR.use_cassette("post_unauthorised_fail") do
            response = mic_lead_enqueue_post

            expect(response.code).to eq(401)
          end
        end

        it 'error message contains details about unauthorised failure' do
          expected_response = {
            "message" => "Unauthorised access_token"
          }

          VCR.use_cassette("post_unauthorised_fail") do
            response = mic_lead_enqueue_post

            expect(response.parsed_response).to eq(expected_response)
          end
        end
      end

      context 'internal server error' do
        before do
          VCR.configure do |c|
            c.allow_http_connections_when_no_cassette = true
          end

          Rails.configuration.lead_api_access_token = 'test_access_token'

          post_params['telephone_number'] = "01234567891"

          stub_request(:post, "http://test_lead_api/api/v1/create" +
            "?access_token=test_access_token&business_name=lead%20business%20test" +
            "&email=leadtest@example.com&name=lead%20test&pAccName=test_paccname" +
            "&pGUID=c5b88f56-00e8-11e8-ba89-0ed5f89f718b&pPartner=test_ppartner" +
            "&telephone_number=01234567891")
          .to_return(
            status: 500,
            body: '{"message": "Can\'t contact Queue Server. Try again later",' +
            '"errors":["Can\'t contact Queue Server. Try again later"]}',
            headers: {}
          )
        end

        it 'returns with http status internal server error' do
          response = mic_lead_enqueue_post

          expect(response.code).to eq(500)
        end

        it 'error message contains details about internal error failure' do
          expected_response = {
            "message" => "Can't contact Queue Server. Try again later",
            "errors" => [ "Can't contact Queue Server. Try again later" ]
          }

          VCR.use_cassette("post_unauthorised_fail") do
            response = mic_lead_enqueue_post

            expect(JSON.parse(response)).to eq(expected_response)
          end
        end
      end
    end
  end
end
