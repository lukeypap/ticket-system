import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { BiBlock } from "react-icons/bi";
import { FaEdit, FaKey, FaPlus, FaTrash } from "react-icons/fa";

export const ActionBar = ({ handleDraw, handleDelete }) => {
    return (
        <HStack
            opacity="0.8"
            alignItems="start"
            w="94%"
            mt={5}
            borderBottom="1px"
            borderBottomColor="gray"
            p={2}
        >
            <HStack>
                <Button
                    size="sm"
                    variant="ghost"
                    borderRadius="0"
                    _focus={{ border: "none" }}
                    style={{ margin: 0 }}
                    onClick={handleDraw}
                >
                    <FaPlus />
                    <Text ml={1} fontWeight="light">
                        New User
                    </Text>
                </Button>
            </HStack>
            <HStack>
                <Button
                    size="sm"
                    variant="ghost"
                    borderRadius="0"
                    _focus={{ border: "none" }}
                    style={{ margin: 0 }}
                    onClick={handleDelete}
                >
                    <FaTrash />
                    <Text ml={1} fontWeight="light">
                        Delete
                    </Text>
                </Button>
            </HStack>
            <Box>
                <Button
                    size="sm"
                    mx={1}
                    variant="ghost"
                    borderRadius="0"
                    _focus={{ border: "none" }}
                >
                    <FaEdit />
                    <Text ml={1} fontWeight="light">
                        Edit
                    </Text>
                </Button>
            </Box>
            <Box>
                <Button
                    size="sm"
                    mx={1}
                    variant="ghost"
                    borderRadius="0"
                    _focus={{ border: "none" }}
                >
                    <FaKey />
                    <Text ml={1} fontWeight="light">
                        Reset Password
                    </Text>
                </Button>
            </Box>
            <Box>
                <Button
                    size="sm"
                    mx={1}
                    variant="ghost"
                    borderRadius="0"
                    _focus={{ border: "none" }}
                >
                    <BiBlock />
                    <Text ml={1} fontWeight="light">
                        Block User
                    </Text>
                </Button>
            </Box>
        </HStack>
    );
};
