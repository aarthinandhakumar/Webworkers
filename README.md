# Web Worker Application

**Project Overview**

This application calculates the sum of the squares of integer ranges by using Web Workers in JavaScript. It spawns five web workers to distribute the workload, with each worker calculating the sum of squares for a distinct range of values. The computed results are stored in the browser's local storage and are dynamically displayed on the interface.

**Setup Instructions**

- Download the project file or clone the repository.
- Create/rename your project folder and move the downloaded files to your project folder.
- Copy the project folder path.
- Open a command prompt or terminal window.
- Type `cd` (Path to your project).
- Type http-server
- Open your browser and enter `http://192.168.1.66:8080` to view the application.

**Features**

1. **Parallelized Calculation**: The main application divides the range of numbers into five sub-ranges and assigns each sub-range to a separate Web Worker.
2. **Sum of Squares Calculation**: Each worker calculates the sum of squares from a start to an end integer using a for-loop.
3. **Random Delay**: To simulate variable processing times, each worker introduces a random delay before sending the result.
4. **Local Storage**: Results received from each worker are stored in an array in the browser’s local storage.
5. **Dynamic UI Update**: As results arrive from workers, the application updates the user interface to display each range's computed result.
   

**API Endpoints**

No external API is required for this project. All contact information is managed within the application.

**License**

This project is licensed under the MIT License - see the [LICENSE](License.txt) file for details.
