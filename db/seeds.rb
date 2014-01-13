# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


e1 = Employee.create(:name => 'Harvey Trotman', :profile_url => 'Harvey.jpg',
								:company => "Apple", :address => '30 San Pablo St, Palo Alto')

e2 = Employee.create(:name => 'Treasa Nic Giolla Chomhaill', :profile_url => 'treasa.jpg',
							:company => 'Intel', :address => "23 Main St Letterkenny")

e1.entries.create(:category => 'productivity', :description => 'Lorem ipsum dolor sit amet, consdfsd sefsdf sdf.',
	 :pic => 'Arduinobw.jpg', :likes => '40', :stars => '3', :shares => '13')

e2.entries.create(:category => 'activity', :description => 'I ran 5km today in 24:34. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem, est, dolore corporis facilis voluptates quasi eligendi necessitatibus magni eveniet minus officia natus! Quis, nihil fugit voluptatibus aut a voluptatum rerum.',
	 :pic => '', :likes => '400', :stars => '345', :shares => '133')

