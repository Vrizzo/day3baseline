Feature: Flight Reservation Lifecycle Management

    Scenario: a draft flight is created from a seatMap
        Given a draft new flight
        Then a flight draft is initialized
        Then a flight is in status draft


#    Scenario: Customer responds to an agent's message
#        Given an assigned support case
#        And the agent replies and changes the status to Pending
#        When customer replies
#        Then message is sent to the agent
#        And status changes to Open
