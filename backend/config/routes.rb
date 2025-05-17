Rails.application.routes.draw do
  scope '/api' do
    devise_for :users,
               path: 'users',
               controllers: {
                 sessions: 'users/sessions',
                 registrations: 'users/registrations'
               }

    resources :users, except: [:create] do
      collection do
        get :search
      end
    end
    post '/users/create', to: 'users#create'

    get '/profile/me', to: 'profile#me'
    get '/my_team', to: 'my_team#index'
    resources :invitations, only: [:index] do
      member do
        put :accept
        put :decline
      end
    end
    post '/invitations/invite', to: 'invitations#invite'
    resources :teams
  end
end
