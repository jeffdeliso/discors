Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy, :show]
    resources :servers, only: [:create, :show, :index, :destroy] do 
      collection do
        post 'join'
      end
    end
    resources :channels, only: [:create, :show, :index]
  end

  root "static_pages#root"
end