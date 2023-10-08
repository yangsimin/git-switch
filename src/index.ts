import prompts from '@posva/prompts'
import { exec } from 'child_process'
import { argv } from 'process'

const args = argv.slice(2).filter(Boolean)
if (args.length === 1) {
  exec(`git switch ${args[0]}`, async (err, stdout, stderr) => {
    if (stderr) {
      console.error(stderr)
      return
    }
  })
} else if (args.length === 0) {
  exec('git branch', async (err, stdout, stderr) => {
    if (stderr) {
      console.error(stderr)
      return
    }
    let initial = 0
    const branches = stdout
      .split('\n')
      .map((branch, index) => {
        const item = {
          title: branch.slice(2),
          value: branch.slice(2),
          disabled: false,
        }
        if (branch.startsWith('*')) {
          item.disabled = true
          initial = index
        }
        return item
      })
      .filter(item => item.title)

    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Select a branch',
      choices: branches,
      initial: initial,
    })

    if (response.value) {
      exec(`git switch ${response.value}`, (error, stdout, stderr) => {
        if (stderr) {
          console.error(stderr)
        }
      })
    }
  })
}
