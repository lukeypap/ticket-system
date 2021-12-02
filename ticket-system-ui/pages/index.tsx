import { VStack } from "@chakra-ui/layout";
import { Content } from "../src/components/content";

const IndexPage = () => (
    <VStack height="100vh" width="full" overflow="hidden" spacing={0} m={0}>
        <Content />
    </VStack>
);

export default IndexPage;
