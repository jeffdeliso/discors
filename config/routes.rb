Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update]
    resource :session, only: [:create, :destroy, :show]
    resources :servers, only: [:create, :show, :index, :destroy] do 
      collection do
        post 'join'
      end
      member do 
        get 'members'
      end
    end


    post '/channels/dm_create', to: 'channels#dm_create'
    get '/channels/dm_index', to: 'channels#dm_index'
    resources :channels, only: [:create, :show, :index, :destroy]
    resources :audio_channels, only: [:create, :show, :index, :destroy] 
    resources :friend_requests, only: [:create, :destroy, :update, :index]
    resources :friends, only: [:destroy, :index]
    resources :dm_channel_memberships, only: [:destroy]
  end

  mount ActionCable.server, at: '/cable'
  root "static_pages#root"
  # get '*path' => redirect('/')
end
