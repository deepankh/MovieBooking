
    
def book_tickets(ticket_number,balance):
    balance-=ticket_number
    # message="\n\n\n\t\ttickets for the show {} has been booked \nThe numbers are {}".format(title,ticket_number)
    return True


def check_balance(number,balance):
    if (number <= balance):
        show=book_tickets_evening(number,balance)
        if show==True:
            return balance

        

        
