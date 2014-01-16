class EntriesController < ApplicationController

	respond_to :json


	def index 
		#debugger
		
		# @entries = Employee.all
		@entries = Entry.all
		# respond_with @entries(:include => :Entry)
		respond_to do |format|
			format.json{render :json => @entries.to_json(:include => :employee )}
		end
		
	end


	def create
		emp = Employee.find_by(:id => params[:id])
	
		if !emp.nil?
			entry = emp.entries.create(:category => params[:category], 
																:description => params[:description])
			render status: 200, json: entry.to_json

		else
			respond_with '{"error" : "not found"}', :status => 404
		end

	end



	def by_employee
		emp = Employee.find_by(:id => params[:id])
		if !emp.nil?
			respond_with emp.entries.all		
		else
			respond_with '{"error" : "not found"}', :status => 404
		end
	end




	def testfile

	end

	def uploadfile
		upload = params[:images]
		filepath = Rails.root.join('public', 'img', upload[0].original_filename)

		File.open(filepath, 'wb') do |file|
			file.write(upload[0].read)
		end
		render status: 200, json: '{"good":"good"}'
	end

end

