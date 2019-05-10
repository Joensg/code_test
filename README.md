# Make it Cheaper Code Test

## Solution Notes
Steps to get the application up and running.

* Ruby version
`ruby 2.5.3p105`

* Database
Not used

* How to run the test suite
```
bundle install
bundle exec rspec
```

* Start server
```
bundle exec rails s
```

### Requirement guidelines
1) Page displayed with a basic form to request a callback

With the server running, navigate to `http://localhost:3000/`

2) Leads are received successfully by the Api on form submission

Submitting a Valid form, returns with a success message, denoting the leads were received successfully.

3) Form fields are validating accordingly

Form fields validate appropriately.

4) A thank you message is displayed to let you know that your request was submitted successfully and that Makeitcheaper will contact you.

On a successful request submission, view displays a thank you message.

5) When form failed to submit due to being down or an error we want the user to see a nice message instead of a generic error.

On server validation error, view displays more information about the error.

### Rspec output
```
Lead Submit API
  get /
    returns with http status success
  post /post_lead
    delegates to MicLeadEnqueue.post_lead

MicLeadEnqueue
  #post_lead
    when success
      returns with http status created
      returns with success message
    when fail
      validation error
        returns with http status bad request
        error message contains details about validation failure
      unauthorized error
        returns with http status unauthorised
        error message contains details about unauthorised failure
      internal server error
        returns with http status internal server error
        error message contains details about internal error failure

rspec
  should works
    expect true to be true

Finished in 2.06 seconds (files took 7 seconds to load)
11 examples, 0 failures
```

### Future enhancements
Given more time, some of the future enhancements would be
- writing some integration tests around the following scenarios
    - a user filling out the form and encountering various validation errors
    - a user submits invalid form and server responds with errors
    - a user submits valid form and server responds with success
- further enhancements to the UI, adding in images, animations to improve UX.
- refactoring the react app code.




## 1. Fork this project to your GitHub

## 2. Do the test

- API documentation on [http://mic-leads.dev-test.makeiteasy.com/api/v1/docs](http://mic-leads.dev-test.makeiteasy.com/api/v1/docs)
- Copy/paste `.env.example` to `.env`
- Setup API token provided by Make It Cheaper
- `bundle install`
- `rails s`

## 3. When finished

- provide a git URL to allow us to read/run your code
- and/or create a pull request

## 4. Your app must start by running the following commands

- `bundle install`
- `rake db:create db:migrate` (If you use a database or sqlite3. It's possible to do the test without any database)
- `rails s`

## Test

```shell
bundle exec rspec
```

## Environments variables

Check `.env.example`

- LEAD_API_PGUID="CFFBF53F-6D89-4B5B-8B36-67A97F18EDEB"
- LEAD_API_PACCNAME="MicDevtest"
- LEAD_API_PPARTNER="MicDevtest"
- LEAD_API_ACCESS_TOKEN=provided_by_make_it_cheaper
