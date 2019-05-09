require 'rails_helper'

describe MicLeadEnqueue, type: :service do

  describe '.new' do
    let(:config_base_uri) { Rails.configuration.lead_api_base_uri }

    subject(:mic_lead_enqueue) { described_class.new }

    it 'creates an instance of the class' do
      expect(mic_lead_enqueue).to be_kind_of(MicLeadEnqueue)
    end
  end

  describe '#post_lead' do
    context 'when success' do
      it 'returns with http status created'

      it 'returns with success message'
    end

    context 'when fail' do
      context 'validation error' do
        it 'returns with http status bad request'

        it 'error message contains details about validation failure'
      end

      context 'unauthorized error' do
        it 'returns with http status unauthorized'
      end

      context 'internal server error' do
        it 'returns with http status internal server error'
      end
    end
  end
end
