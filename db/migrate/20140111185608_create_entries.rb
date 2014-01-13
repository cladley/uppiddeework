class CreateEntries < ActiveRecord::Migration
  def change
    create_table :entries do |t|
    	t.string :category
    	t.text :description
    	t.string :pic
    	t.integer :likes
    	t.integer :stars
    	t.integer :shares
    	t.integer :employee_id


      t.timestamps
    end
  end
end
