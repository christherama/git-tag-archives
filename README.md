# Github Archive Download
This nodejs script is meant to facilitate the downloading of ZIP archives from a Github repository. Using this script, one archive per tag will be downloaded to your system's **Downloads** directory - *[HOMEDIR]*/Downloads.
## Configuration
To configure the script, change the name of `config.sample.js` to `config.js`, and replace the listed values with your unique values. See Github for [Creating an access token for command-line use](https://help.github.com/articles/creating-an-access-token-for-command-line-use/).
## Execution
To execute the script, open a terminal window and navigate to the *git-tag-archives* directory. Then, run the following command:

     node git-tag-archives.js [repo_path]

 Where `[repo_path]` is replaced by the repository's path on Github. For example:

     node git-tag-archives.js angular/material

 After running this command, you should see a series of ZIP files downloaded to your *~/Downloads~ directory - one for each tag in the remote repo.