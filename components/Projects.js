import React, { useState, useEffect } from "react";
import { Star, Lightning, Code } from "phosphor-react";
import { Box, Stack, Flex, Tooltip, Link, Button, Heading, Text, HStack, Icon, Badge } from "@chakra-ui/react";

const Project = ({ title, description, repo }) => {
  const [data, setData] = useState(false);
  const getStars = () => {
    fetch(`https://api.github.com/repos/mitul-s/${repo}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  };

  useEffect(() => {
    getStars();
  }, []);

  return (
    <Box p={6} border="1px solid" borderColorScheme="trueGray">
      <Flex justifyContent="space-between" alignItems="center" mb={3}>
        <Heading size="md">{title}</Heading>
        {data.stargazers_count > 0 ?
        <Tooltip
          label="Github Stargazers"
          aria-label="Github Stargazers"
          closeOnClick={false}
          closeOnMouseDown={false}
          openDelay={600}
        >
          <HStack>
            <Icon fontSize="xl" as={Star} />
            <Text>{data.stargazers_count}</Text>
          </HStack>
        </Tooltip> : '' }
      </Flex>
      <Text>{description}</Text>
      {repo ? (
        <HStack fontSize="sm" mt={3} color="trueGray.500">
          <Link href={data.homepage} isExternal>
            <Button
              variant="link"
              fontWeight="normal"
              rightIcon={<Lightning />}
            >
              Demo
            </Button>
          </Link>
          <Link href={data.svn_url} isExternal>
            <Button variant="link" fontWeight="normal" rightIcon={<Code />}>
              Code
            </Button>
          </Link>
        </HStack>
      ) : (
        ""
      )}
    </Box>
  );
};

export default Project;
