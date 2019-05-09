Rails.application.routes.draw do
  post 'post_lead' => 'lead_submit#post_lead'

  root 'lead_submit#index'
end
