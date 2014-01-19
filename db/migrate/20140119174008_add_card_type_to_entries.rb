class AddCardTypeToEntries < ActiveRecord::Migration
  def change
    add_column :entries, :card_type, :string
  end
end
