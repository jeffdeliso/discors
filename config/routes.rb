Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy, :show]
    resources :servers, only: [:create, :show, :index, :destroy] do 
      collection do
        post 'join'
      end
      member do 
        get 'members'
      end
    end
    resources :channels, only: [:create, :show, :index, :destroy] do
      collection do
        post 'dm_create'
        get 'dm_index'
      end
    end
    resources :friend_requests, only: [:create, :destroy, :update, :index]
    resources :friends, only: [:destroy, :index]
  end

  mount ActionCable.server, at: '/cable'
  root "static_pages#root"
  get '*path' => redirect('/')
end
