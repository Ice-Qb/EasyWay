class CreateRecipients < ActiveRecord::Migration
  def change
    create_table :recipients do |t|
      t.integer :notify_event_id
      t.integer :user_id
      t.integer :group_number

      t.timestamps
    end
  end
end
