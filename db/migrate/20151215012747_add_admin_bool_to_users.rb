class AddAdminBoolToUsers < ActiveRecord::Migration
  def change
    add_column :users, :is_admin, :bool, default: false
  end
end
