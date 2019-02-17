Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :update] do
      collection do
        get 'data'
      end
    end
    resource :session, only: [:create, :destroy]
    resources :channels, only: [:create, :index, :destroy]
    resources :audio_channels, only: [:create, :index, :destroy] 
    resources :friend_requests, only: [:create, :destroy, :update]
    resources :friends, only: [:destroy]
    resources :dm_channel_memberships, only: [:destroy, :create]
    resources :servers, only: [:create, :index, :destroy] do 
      collection do
        post 'join'
      end
      member do 
        get 'members'
      end
    end
  end

  mount ActionCable.server, at: '/cable'
  root "static_pages#root"
  
end
