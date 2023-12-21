// Todo: Add automatically generated query params to this to make it easier to customize this

// Get name of article due today, if any. Otherwise returns 'No article'
export const getArticleName = async (): Promise<string> => {
  const today = new Date().toISOString().slice(0, 10);

  const getArticleDueToday = async () => {
    const apiUrl = `https://app.asana.com/api/1.0/user_task_lists/${process.env.ASANA_USER_TASK_LIST_GID}/tasks?completed_since=${today}&opt_fields=name,completed,due_on`;

    const task = await fetch(apiUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${process.env.ASANA_ACCESS_TOKEN}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Error fetching task list from Asana");
          process.exit(1);
        }
        return response.json();
      })
      .then((data) => {
        let task;
        task = data.data.find((task: any) => {
          return task.due_on === today;
        });

        if (!task) {
          console.log("No article due today");
          process.exit(0);
        }

        return task;
      });

    return task;
  };

  let articleName = await getArticleDueToday();

  // This Regex gets rid of the leading numbers and the first space
  const formattedArticleName = articleName.name.replace(/^\d+\.\s*/, "");

  console.log(`Task due today: ${formattedArticleName}`);
  return formattedArticleName;
};
