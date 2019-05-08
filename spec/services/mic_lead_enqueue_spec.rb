require 'rails_helper'

describe MicLeadEnqueue, type: :service do

  describe '.new' do
    let(:config_base_uri) { Rails.configuration.lead_api_base_uri }

    subject(:mic_lead_enqueue) { described_class.new }

    it 'creates an instance of the class' do
      expect(mic_lead_enqueue).to be_kind_of(MicLeadEnqueue)
    end

    it 'sets instance variable of base_uri to config base uri' do
      expect(mic_lead_enqueue.base_uri).to eq(config_base_uri)
    end

    context 'when base_uri is provided' do
      let(:provided_base_uri) { 'some_test_uri' }

      subject(:mic_lead_enqueue) { described_class.new provided_base_uri }

      it 'sets instance variable of base_uri to provided base_uri' do
        expect(mic_lead_enqueue.base_uri).to eq(provided_base_uri)
      end
    end
  end
end
