Feature: Fleet Management Lifecycle Management

    Scenario: a draft new cabinLayout at Aggregate Level
        Given a draft new cabinLayout
        Then a cabinLayout draft is initialized
        Then a cabinLayout is in status draft

    Scenario: a draft new cabinLayout at Application Level
        Given a draft new cabinLayout
        Then a cabinLayout is in status draft

#    Scenario: Customer responds to an agent's message
#        Given an assigned support case
#        And the agent replies and changes the status to Pending
#        When customer replies
#        Then message is sent to the agent
#        And status changes to Open
