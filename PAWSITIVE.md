---

# PAWsitive

Visit and Support us at - www.bepawsitive.xyz

## Project Inspiration
The inspiration for PAWsitive came from the need to create a centralized platform that connects pet owners with essential services such as blood donors, veterinary clinics, and rescue centers. Our goal is to ensure the well-being of pets by making it easier for their owners to find and access the necessary resources.

## Project Description
PAWsitive is a comprehensive web application designed to help pet owners find blood donors, veterinary clinics, and rescue centers with ease. The platform features:

- **Blood Donors Directory**: Search and filter blood donors based on specific criteria.
- **Veterinary Clinics Locator**: Find nearby veterinary clinics and get detailed information about their services.
- **Rescue Centers Directory**: Access a directory of rescue centers with information on ambulance services.
- **Registration Portals**: Register as a blood donor, veterinary clinic, rescue center, or event host.
- **Spotlight Section**: Highlight ongoing projects and campaigns to encourage community participation.
- **Voice Assistant Section**: Provide customer support and educational resources for pet owners through voice assistant calls powered by Callchimp.AI.
- **Fully Customized AI Chatbot**: Gemini powered AI chatbot to tackle all animal-related queries of users and provide customized answers through puns for other doubts.

## Tech Stacks Used
- **React**: For building the user interface.
- **Next.js**: For server-side rendering and building static websites.
- **TypeScript**: For static type checking to improve code quality.
- **MongoDB**: For the database to store and retrieve data.
- **Tailwind CSS**: For styling the application with a dark theme.
- **Node.js**: For backend development and handling server-side operations.

## Third-Party Technologies Used

### Kinde Authentication Service
<img width="138" height="70" alt="image" src="https://github.com/Parthiba-Mukhopadhyay/BongO.n/assets/88925745/65d714e4-f522-4739-aacd-a9dc209c7e6a">

For user authentication using OTP, login, and signup.

### UploadThing
<img width="138" height="70" alt="image" src="https://github.com/Parthiba-Mukhopadhyay/BongO.n/assets/88925745/a9086357-b7ad-45ea-80ab-0594fec4fc44">

To upload images of certificates for dog vaccination certificate status.

### Callchimp.ai
<img width="150" height="70" alt="image" src="https://github.com/Parthiba-Mukhopadhyay/BongO.n/assets/88925745/5cab4f57-63fb-483e-b165-e22a3b2511d7">

To integrate a calling service that tackles user doubts related to pet-related queries. 
The architecture of the API Calls is explained below.

#### Integration Steps:
1. **Authentication**:
   ```javascript
   const apiKey = 'your-api-key';
   ```
2. **Create Supervisor**:
   ```javascript
   callchimp.createSupervisor({
     name: 'Supervisor Name'
   }).then(response => {
     // Handle create supervisor response
   });
   ```
3. **Send OTP to Supervisor by ID**:
   ```javascript
   callchimp.sendOtpToSupervisor({
     supervisorId: 'supervisor-id'
   }).then(response => {
     // Handle OTP sent response
   });
   ```
4. **Verify Supervisor OTP by ID**:
   ```javascript
   callchimp.verifySupervisorOtp({
     supervisorId: 'supervisor-id',
     otp: '123456'
   }).then(response => {
     // Handle verified response
   });
   ```
5. **List Subscribers**:
   ```javascript
   callchimp.listSubscribers().then(response => {
     // Handle list subscribers response
   });
   ```
6. **Create Call**:
   ```javascript
   callchimp.createCall({
     leadId: 'lead-id'
   }).then(response => {
     // Handle create call response
   });
   ```

### Gemini API
<img width="138" height="70" alt="image" src="https://github.com/Parthiba-Mukhopadhyay/BongO.n/assets/88925745/fc22ce4d-31aa-4b52-92fd-fd4b36da31c4">

To create a custom chatbot for solving animal-related user queries.

### .xyz Domain 
<img width="138" height="70" alt="image" src="https://github.com/Parthiba-Mukhopadhyay/BongO.n/assets/88925745/94cd7279-9744-4e4c-9e42-97a954bf1c64">

To host the Website on a custom domain name.

## How to Start and Run the Project

Follow these steps to start and run the PAWsitive project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Parthiba-Mukhopadhyay/BongO.n
   ```

2. **Navigate into the project directory**:
   ```bash
   cd BongO.n
   ```

3. **Create a `.env.local` file**:
   Add your API keys for Kinde Auth, Next.js, MongoDB, Gemini, and UploadThing in the `.env.local` file.

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to `http://localhost:3000` to see the application running.

## Walkthrough of the Project

Here are the steps to navigate through the PAWsitive application:

1. **Landing Page**: The homepage of the PAWsitive application.
<img src="https://github.com/Parthiba-Mukhopadhyay/BongO.n/assets/89331202/193dcbda-2cc9-445c-a2f0-61e58e1922ed" width="600" height="350" />

2. **Login/Sign Up**: Authenticate users via Kinde for secure access.
   <br/>
<img src="https://github.com/Parthiba-Mukhopadhyay/BongO.n/assets/89331202/721091c4-89a3-4a5c-a24a-9b5eb5e45c53" width="300" height="400" /> <img src="https://github.com/Parthiba-Mukhopadhyay/BongO.n/assets/89331202/df6d5c0e-ac9a-4baf-ab2d-93d0e3595d4d" width="300" height="400" />

4. **Dashboard**: The main interface with access to all features.
 - **Spotlight Section**: Highlight ongoing projects and campaigns.
 - **Call Support**: Access voice assistant support powered by Callchimp.AI.
<img src="https://github.com/Parthiba-Mukhopadhyay/BongO.n/assets/89331202/2ddb3b0e-2002-45f6-9648-b0f91956d4f2" width="600" height="400" />

 - **Services**:
   - **View Donors**: Search and filter through blood donors.
   - **View Veterinary Clinics**: Locate nearby veterinary clinics.
   - **View Rescue Centers**: Find rescue centers and ambulance services.

<img src="https://github.com/Parthiba-Mukhopadhyay/BongO.n/assets/89331202/c9c66679-9674-4ff0-96be-3454ef8a1bf5" width="600" height="400" />

 - **Collaborations**:
   - **Register as Donor**: Sign up as a blood donor.
   - **Register as Vet Clinic**: Register a veterinary clinic.
   - **Register as Rescue Center**: Enroll a rescue center.
   - **Register Events and Campaigns**: Organize events and campaigns.
     
<img src="https://github.com/Parthiba-Mukhopadhyay/BongO.n/assets/89331202/f9c35cfa-00b5-4e1a-825a-b20960de4db4" width="600" height="400" />


4. **AI Chatbot**: Use the Gemini-powered chatbot for animal-related queries.
<img src="https://github.com/Parthiba-Mukhopadhyay/BongO.n/assets/89331202/23812d42-a331-48bd-a6be-6a14ac298290" width="300" height="400" />


## Detailed Working of the Project

For a comprehensive understanding of how the PAWsitive project works, you can watch our video walkthrough on youtube:

[Watch the Detailed Video Walkthrough](https://youtu.be/_PkeZ2sBX1o)

## Team
- **Parthiba Mukhopadhyay**: Full Stack Developer
- **Mainak Chattopadhyay**: Full Stack Developer
- **Aritro Saha**: Full Stack Developer

#### Built at Hack4Bengal - Eastern India's Largest Hackathon
<img width="228" alt="image" src="https://github.com/Parthiba-Mukhopadhyay/BongO.n/assets/88925745/691b4b01-039b-4a5b-941e-20190d439f70">



---
