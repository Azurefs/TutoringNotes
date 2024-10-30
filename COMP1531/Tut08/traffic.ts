type States = 'RED' | 'YELLOW' | 'GREEN';
type Actions = 'CAR_WAITING' | 'NO_CAR_WAITING' | 'EMERGENCY';

interface Light {
    state: States
}

let light: Light = {
    state: "RED"
}

let timerId: ReturnType<typeof setTimeout>;

export function updateLight(action: Actions) {
    if (light.state === 'RED') {
        if (action === 'CAR_WAITING') {
            light.state = 'GREEN';
            return;
        }
    } else if (light.state === 'GREEN') {
        if (action === 'NO_CAR_WAITING') {
            light.state = 'YELLOW';
            timeoutRed(); 
            return;
        } else if (action === 'EMERGENCY') {
            light.state = 'RED';
            return;
        }
    } else if (light.state === 'YELLOW') {
        if (action === 'EMERGENCY') {
            light.state = 'RED'
            clearTimeout(timerId);
            timerId = undefined;
            return;
        }
    }
    throw new Error(`INVALID STATE ACTION PAIR PROVIDE - ${action} - ${light.state}`);
}

// RED
// Car waiting
// Green
// No car waiting
// Yellow
//  - set a time out for 3 seconds
// within one second -> emergency
// red
// within another second - no car waiting
// Green
// wait another second
// TIME OUT EXECUTES
// GREEN -> REd

function timeoutRed() {
    // DOes not stop your code
    timerId = setTimeout(() => {
        light.state = 'RED';
    }, 3000)
}



// Functions for test suite

/**
 * Resets the state of the traffic lights back to RED
 */
export function reset() {
    clearTimeout(timerId);
    timerId = undefined;
    light.state = "RED";
}

/**
 * Returns the current state of the traffic light
 */
export function getState() {
    return light.state;
}