class Employee < ActiveRecord::Base
	has_many :entries
end
