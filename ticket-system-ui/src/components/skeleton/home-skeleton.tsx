import React from "react";

interface Props {}

const HomeSkeleton = (props: Props) => {
    return (
        <VStack
            width="full"
            overflow="auto"
            sx={{
                "&::-webkit-scrollbar": {
                    width: "5px",
                    borderRadius: "8px",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "brand.red",
                },
            }}
        >
            <PageHeader
                title={`Welcome ${currentUser.firstName}`}
                handleSearchChange={handleSearchChange}
                addText={"Here's the most recent tickets..."}
                renderSearchBar={true}
            />
            <TicketTable
                tickets={data.tickets}
                handleDelete={handleDelete}
                handleStatus={handleStatus}
                onOpen={onOpen}
                setModalId={setModalId}
                searchTerm={searchTerm}
                filteredTickets={filteredTickets}
            />
            )
            <ConfirmModal
                message="Are you sure you wish to delete this? You can't undo this."
                title="Delete Ticket"
                isOpen={isOpen}
                onClose={onClose}
                icon={<IoWarning />}
                onSubmit={handleDelete}
            />
            <FormModal
                message="Please enter the info below"
                title="Create Ticket"
                isOpen={isOpenCreateTicketModal}
                onClose={onCloseCreateTicketModal}
                icon={<IoWarning />}
                handleCreate={handleCreate}
            />
        </VStack>
    );
};

export default HomeSkeleton;
