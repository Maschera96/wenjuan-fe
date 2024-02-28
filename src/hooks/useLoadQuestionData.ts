import { useParams } from "react-router-dom";
import { getQuestionService } from "../services/question";
import { useRequest } from "ahooks";

function useLoadQuestionData() {
  const { id = "" } = useParams();

  async function load() {
    const data = await getQuestionService(id);
    return data;
  }

  const { data, error, loading } = useRequest(load);

  return { data, error, loading };
}

export default useLoadQuestionData;
