# Use the official Python 3.10 image
FROM python:3.10.12

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port the app runs on
EXPOSE 8985

# Define environment variable
ENV FLASK_APP=spark-report-service.py

# Run the application
CMD ["python", "spark-report-service.py"]


