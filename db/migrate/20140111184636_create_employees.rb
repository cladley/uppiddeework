class CreateEmployees < ActiveRecord::Migration
  def change
    create_table :employees do |t|
      t.string :name
      t.string :profile_url 
      t.string :company
      t.string :address 
      t.timestamps
    end
  end
end
