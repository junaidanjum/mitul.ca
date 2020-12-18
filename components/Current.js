import React, { useEffect, useState } from "react"
import { Box, Text, HStack, Icon, Stack, Link, useMediaQuery, Spinner, Center } from "@chakra-ui/react"
import { MusicNotesSimple, Monitor, Bookmarks } from "phosphor-react";
import Section from "@/components/Section";



const CurrentItem = ({ icon, title, caption, link }) => {
  return (
      <HStack spacing={4}>
        <Icon fontSize="xl" as={icon} />
        <Box>
          <Link href={link} _hover={{ color: "blueGray.500" }} isExternal>
            <Text fontWeight="bold" maxW="175px" whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">{title}</Text>
            <Text fontSize="sm" color="trueGray.500">
              {caption}
            </Text>
          </Link>
        </Box>
      </HStack>
  );
}


const Current = () => {
  
  const [ isDesktop ] = useMediaQuery("(min-width: 700px)");

  const [data, setData] = useState("");
  const [loading, setLoading] = useState('');
  const [error, setError] = useState();
  const username = "mitul-s";

  useEffect(() => {
    let ignore = false;
    const getMusic = async () => {
      const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${process.env.NEXT_PUBLIC_LASTFM_KEY}&format=json`;
      try {
        setLoading(true);
        const res = await fetch(url);
        const body = await res.json();
        if (!ignore) setData(body);
       
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getMusic();
    return () => {
      ignore = true;
    };
  }, []);

  if(loading || !data) {
    return (<Center><Spinner/></Center>)
  }

  return (
    <Section header="Currently">
      <Stack spacing={8} direction={isDesktop ? "row" : "column"}>
        <CurrentItem
          icon={MusicNotesSimple}
          title={data.recenttracks.track[0].name}
          caption={data.recenttracks.track[0].artist["#text"]}
          link={data.recenttracks.track[0].url}
        />
        <CurrentItem
          icon={Bookmarks}
          title={"Range"}
          caption={"David Epstein"}
          link="https://beta.readng.co/book/range-by-david-epstein-zbmEW"
        />
        <CurrentItem icon={Monitor} title={"New Girl"} caption={"Sitcom"} />
      </Stack>
    </Section>
  );
}

export default Current;