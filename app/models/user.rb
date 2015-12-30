class User < ActiveRecord::Base
  has_secure_password
  has_many :reviews, dependent: :destroy
  validates :first_name, presence: true

  # TODO: move this to the serializer
  def display_name
    "#{first_name} #{last_name[0].capitalize}."
  end
end
