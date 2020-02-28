const core = require('@actions/core');
const github = require('@actions/github');

try {
    const versionFilePath = core.getInput('version-file-path');
    console.log(`Reading file from ${versionFilePath}`);

    const octokit = new github.GitHub(core.getInput('github-token'));

    octokit.pulls.listFiles({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        pull_number: github.context.payload.pull_request.number
    }).then(({data}) => {

        let versionFile = data.find(function (file) {
            return file.filename === versionFilePath;
        });

        if (versionFile == null) {
            console.log(`Could not find file to read project version`);
            core.setOutput('project-version', null);
            return;
        }

        octokit.request("GET " + versionFile.raw_url)
            .then(({data}) => {
                let version = data.trim();
                console.log(`Found version ${version}`);
                core.setOutput('project-version', version);
            });

    }).catch((error) => {
        console.debug(error);
        core.setFailed('Unknown Error!')
    })

} catch (error) {
    core.setFailed(error.message);
}
