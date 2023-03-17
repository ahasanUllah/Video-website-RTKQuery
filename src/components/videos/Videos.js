import { useGetVideosQuery } from '../../features/api/apiSlice';
import Video from './Video';
import Loading from '../../components/ui/loaders/VideoLoader';
import Error from '../../components/ui/Error';

export default function Videos() {
   const { data: videos, isLoading, isError, error } = useGetVideosQuery();

   let content;
   if (isLoading) content = <Loading />;
   if (!isLoading && isError) content = <Error message={'Something went wrong'} />;
   if (!isLoading && !isError && videos.length === 0) content = <Error message={'no video found'} />;
   if (!isLoading && !isError && videos.length > 0)
      content = videos.map((video) => <Video key={video.id} video={video} />);
   return <>{content}</>;
}
