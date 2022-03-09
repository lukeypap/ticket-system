import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    FormControl,
    FormLabel,
    Input,
    Select,
    DrawerFooter,
    Button,
    useToast,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";

const initialValues = {
    firstName: "test",
    lastName: "",
    email: "",
    password: "",
    role: "user",
    department: "",
    mobile: "",
};

export const UserDraw = ({ onClose, isOpen, size, handleCreate }) => {
    const [values, setValues] = useState(initialValues);
    const toast = useToast();
    const initialRef = useRef();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const fieldValue = { [name]: value };
        setValues({
            ...values,
            [name]: value,
        });
    };
    return (
        <Drawer onClose={onClose} isOpen={isOpen} size={size}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">Create Account</DrawerHeader>
                <DrawerBody>
                    <FormControl isRequired mt={8}>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            name="firstName"
                            value={values.firstName}
                            ref={initialRef}
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl isRequired mt={4}>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            name="lastName"
                            value={values.lastName}
                            ref={initialRef}
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl isRequired mt={12}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            name="email"
                            value={values.email}
                            ref={initialRef}
                            placeholder="someone@something.com"
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl isRequired mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input
                            name="password"
                            value={values.password}
                            ref={initialRef}
                            type="password"
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl mt={12}>
                        <FormLabel>Role</FormLabel>
                        <Select name="role" onChange={handleInputChange} value={values.role}>
                            <option value=""></option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </Select>
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Department</FormLabel>
                        <Input
                            name="department"
                            value={values.department}
                            ref={initialRef}
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Mobile</FormLabel>
                        <Input
                            name="mobile"
                            value={values.mobile}
                            ref={initialRef}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </DrawerBody>
                <DrawerFooter borderTopWidth="1px">
                    <Button onClick={onClose} mr={3}>
                        Cancel
                    </Button>
                    <Button
                        colorScheme="blue"
                        onClick={() => {
                            handleCreate(values);
                            console.log(values);
                            onClose();
                            setValues(initialValues);
                            toast({
                                title: "User Created",
                                status: "success",
                                duration: 9000,
                                isClosable: true,
                            });
                        }}
                    >
                        Submit
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
