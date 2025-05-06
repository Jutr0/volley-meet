Rails.application.routes.draw do
  scope '/api' do
    devise_for :users,
               path: 'users',
               controllers: {
                 sessions: 'users/sessions',
                 registrations: 'users/registrations'
               }

    resource :users, only: [] do
      get :me, to: 'users#me'
    end
  end
end
