# WEB103 Project 4 - *FreshCuts Barbershop*

Submitted by: **Baire Diaz**

About this web app: **FreshCuts is a barbershop booking customizer that lets users build their perfect haircut package by selecting a haircut style, beard service, scalp treatment, and stylist preference. The total price updates live as options are selected. Users can save, view, edit, and delete their bookings.**

Time spent: **4** hours

## Required Features

The following **required** functionality is completed:

<!-- Make sure to check off completed functionality below -->
- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
  - [x]  **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x]  **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **Users can view **multiple** features of the `CustomItem` (e.g. car) they can customize, (e.g. wheels, exterior, etc.)**
- [x] **Each customizable feature has multiple options to choose from (e.g. exterior could be red, blue, black, etc.)**
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [x] **The price of the `CustomItem` (e.g. car) changes dynamically as different options are selected *OR* The app displays the total price of all features.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [x] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- [x] **Users can view a list of all submitted `CustomItem`s.**
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can update or delete `CustomItem`s that have been created from the detail page.**


The following **optional** features are implemented:

- [x] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [x] List anything else that you added to improve the site's functionality!
 > Live booking summary preview panel that updates in real time as options are selected
 > Dynamic price breakdown showing the cost of each selected option
 > Premium dark UI with gold accents and smooth animations
 > Fully responsive layout with mobile breakpoints

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='https://cdn.loom.com/sessions/thumbnails/6068995b3a8e4a19b05c71f87411b7c2-9f5456b55087daec-full-play.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with Loom GIF tool here

## Notes

Describe any challenges encountered while building the app or any additional context you'd like to add.
> Configuring dotenv to correctly find the .env file when running scripts from the project root was the trickiest part of the setup.
> Structuring a Vite + React frontend alongside an Express backend in a single repository required careful configuration of the vite.config.js root option.
> Managing real-time price updates and visual feedback across multiple selections required thoughtful use of React state.

## License

Copyright [2026] [Baire Diaz]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.