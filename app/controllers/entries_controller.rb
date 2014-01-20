class EntriesController < ApplicationController

	respond_to :json


	def index 
		@entries = Entry.all
		# respond_with @entries(:include => :Entry)
		respond_to do |format|
			format.json{render :json => @entries.to_json(:include => :employee )}
		end		
	end


	def create
		filename = ""
		card_type = "standard"
		emp = Employee.find_by(:id => params[:id])

		if !emp.nil?
			# Get uploaded file 
			if params[:images]
				save_file params[:images]
				filename = params[:images][0].original_filename
				card_type = 'photo'
			end

			entry = emp.entries.create(:category => params[:category], 
																 :description => params[:description], 
																 :pic => filename, :card_type => card_type)

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


	private 
		# Todo : error handling
		def save_file(upload)
			filename = upload[0].original_filename
			filepath = Rails.root.join('public', 'img', filename)

			File.open(filepath, 'wb') do |file|
				file.write(upload[0].read)
			end
		end
end

